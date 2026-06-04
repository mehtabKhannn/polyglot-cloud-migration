import os
import time
import json
import redis
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
r = redis.from_url(REDIS_URL)

def process_tasks():
    logging.info("Worker started, waiting for tasks...")
    # Update worker status
    r.set("worker_status", "running")

    while True:
        try:
            # Look for tasks in the 'tasks_queue'
            task = r.lpop('tasks_queue')
            if task:
                task_data = json.loads(task)
                task_id = task_data.get('id')
                logging.info(f"Processing task {task_id}")
                
                # Simulate processing time
                time.sleep(2)
                
                task_data['status'] = 'Completed'
                # Save the result back
                r.hset('tasks_completed', task_id, json.dumps(task_data))
                logging.info(f"Completed task {task_id}")
            else:
                # No tasks, wait before polling again
                time.sleep(5)
                
            # Periodically update status
            r.set("worker_status", "running")
            
        except redis.ConnectionError:
            logging.error("Failed to connect to Redis, retrying in 5s...")
            time.sleep(5)
        except Exception as e:
            logging.error(f"Error processing task: {e}")
            time.sleep(5)

if __name__ == '__main__':
    process_tasks()
