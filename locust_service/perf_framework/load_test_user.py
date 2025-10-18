from locust import constant_throughput, FastHttpUser


class LoadTestUser(FastHttpUser):
    wait_time = constant_throughput(2000)
    _test_data: dict | None
    
    @property
    def test_data(self) -> None:
        return self._test_data

    @test_data.setter
    def test_data(self, test_data: dict | None) -> dict | None:
        self._test_data = test_data
