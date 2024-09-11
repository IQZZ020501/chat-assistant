import logging
import logging.config
import json
import os


def setup_logging(
        default_path: str = '../setting/logging_config.json',
        default_level: int = logging.INFO,
        env_key: str = 'LOG_CFG'
) -> None:
    path = default_path
    value = os.getenv(env_key, None)
    if value:
        path = value
    if os.path.exists(path):
        with open(path, 'rt') as f:
            config = json.load(f)
        logging.config.dictConfig(config)
    else:
        logging.basicConfig(level=default_level)


setup_logging()
logger: logging.Logger = logging.getLogger(__name__)
