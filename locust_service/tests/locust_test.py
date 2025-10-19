from locust import tag, task

from perf_framework.load_test_user import LoadTestUser

class WebAppUser(LoadTestUser):
    @task
    @tag("p0", "local")
    def home_page(self):
        home_page = "/"
        self.client.get(home_page)
    
    @task
    @tag("p0", "local")
    def create_task(self):
        id = self.test_data["id"]
        task_endpoint = "/task"
        payload = {
            "user_id": id, "title": "a task", "description": "Some description"
        }
        self.client.post(task_endpoint, json=payload)
