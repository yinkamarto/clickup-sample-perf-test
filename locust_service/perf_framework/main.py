from dataclasses import dataclass
from typing import Any
import click
import gevent

from locust import events
from locust.env import Environment
from locust.log import setup_logging
from locust.runners import LocalRunner
from locust.stats import (
    print_error_report,
    print_percentile_stats,
    print_stats,
    stats_history,
    stats_printer
)

from perf_framework.load_test_user import LoadTestUser
from perf_framework.test_setup_map import test_map


setup_logging("INFO")


@dataclass
class Options:
    host: str
    user_count: int
    run_time: int
    


@click.command()
@click.option("--host", default="http://web_service:3000", help="Base URL.")
@click.option("--user-count", default=20, help="Number of users.")
@click.option("--run-time", default=10, help="Test run time.")
def start_runner(host: str, user_count: int, run_time: int):
    import requests
    
    try:
        requests.get("http://web_service:3000")
    except Exception as e:
        print(f"http://web_service: {e}")
    
    try:
        requests.get("http://localhost:3000/")
    except Exception as e:
        print(f"http://localhost: {e}")
    
    try:
        requests.get("http://127.0.0.1")
    except Exception as e:
        print(f"http://127.0.0.1: {e}")
        
    PerfRunner(Options(host, user_count, run_time)).start()


class PerfRunner():
    test_scenarios: dict[LoadTestUser, Any] = test_map
    user_classes: list[LoadTestUser] = []
    
    
    runner: LocalRunner | None = None
    env: Environment | None = None
    options: Options | None = None
    
    def __init__(self, options: Options):
        """Setup locust environment and runner.
        
        Args:
            options (Options): Custom options for test run.
        """

        # set up test data for each user class
        for user_class, setup in self.test_scenarios.items():
            user_class.test_data = setup()
        
        self.user_classes = list(test_map.keys())
        self.env = Environment(
            user_classes=self.user_classes,
            events=events,
            host=options.host,
        )
        self.options = options
        
        self.runner = self.env.create_local_runner()
    
    def start(self):
        """Starts the test runner and executes tests."""

        # execute init event handlers (only really needed if you have registered any)
        self.env.events.init.fire(environment=self.env, runner=self.runner)

        # start a greenlet that periodically outputs the current stats
        gevent.spawn(stats_printer(self.env.stats))

        # start a greenlet that save current stats to history
        gevent.spawn(stats_history, self.env.runner)

        # start the test
        self.runner.start(self.options.user_count, spawn_rate=10)

        # number of seconds to run test before stopping the runner
        gevent.spawn_later(self.options.run_time, self.runner.quit)

        # wait for the greenlets
        self.runner.greenlet.join()
        
        print("\n\n")
        print("_" * 50)
        print("\n Test Summary")
        print("_" * 50, "\n")
        print_stats(self.env.stats)
        print_percentile_stats(self.env.stats)
        print_error_report(self.env.stats)


if __name__ == "__main__":
    start_runner()
