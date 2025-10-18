from locust import FastHttpUser
from tests import test_setup
from tests.locust_test import WebAppUser
from typing import Callable


test_map: dict[type[FastHttpUser], Callable] = {
    WebAppUser: test_setup.setup,
}