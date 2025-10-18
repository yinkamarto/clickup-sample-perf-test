from locust import task

from perf_framework.load_test_user import LoadTestUser

class WebAppUser(LoadTestUser):
    @task
    def hello_world(self):
        id = self.test_data["id"]
        self.client.get(f"", name=f"{self.host}/{id}")
