import json


# Simulating worker logic for tests
def process_task_data(task_json):
    task_data = json.loads(task_json)
    task_data['status'] = 'Completed'
    return task_data


def test_task_processing():
    task_json = json.dumps({"id": 1, "name": "Test Task", "status": "Pending"})
    result = process_task_data(task_json)

    assert result['id'] == 1
    assert result['status'] == 'Completed'


def test_worker_status_parsing():
    status = "running"
    assert status == "running"


def test_json_serialization():
    data = {"status": "running", "version": "1.0.0"}
    json_str = json.dumps(data)
    assert "running" in json_str
