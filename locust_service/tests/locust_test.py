from locust import constant_throughput, HttpUser, task
import random

class HelloWorldUser(HttpUser):
    base_url = "http://web_service:3000"
    host = "http://web_service:3000"
    wait_time = constant_throughput(2000)
    
    @task
    def hello_world(self):
        id = random.randint(1, 5)
        self.client.get(f"/{id}", name=f"{self.base_url}/{id}")
