import json
import os
from models.utils.logger import logger
from typing import Dict, Union, Optional

available_setting: Dict[str, Union[str, float]] = {
    "model_name": "",
    "model_type": "",
    "api_type": "",
    "access_token": "",
    "temperature": 0.95
}


class Config(dict):
    def __init__(self, config_dict: Optional[Dict[str, Union[str, float]]] = None):
        super().__init__(config_dict or {})

    def __getitem__(self, key: str) -> Union[str, float]:
        if key not in available_setting:
            raise AttributeError(f"{key} not in available_setting")
        return super().__getitem__(key)

    def __setitem__(self, key: str, value: Union[str, float]):
        if key not in available_setting:
            raise AttributeError(f"{key} not in available_setting")
        super().__setitem__(key, value)

    def get(self, key: str, default: Optional[Union[str, float]] = None) -> Union[str, float, None]:
        return super().get(key, default)


config = Config()


def load_config():
    global config
    config_path: str = os.path.join(os.path.dirname(__file__), "config.json")

    if not os.path.exists(config_path):
        raise FileNotFoundError(f"config file not found: {config_path}")

    config_str: str = read_file(config_path)
    logger.info(f"config file loaded: {config_str}")

    config = Config(json.loads(config_str))
    override_config_with_env()


def override_config_with_env() -> None:
    for name, value in os.environ.items():
        name = name.lower()

        if name in available_setting:
            logger.info(f"[INIT] override config by environ args: {name}={value}")

            try:
                config[name] = eval(value)
            except (SyntaxError, NameError, TypeError) as e:
                logger.error(f"error when eval {name}={value}, {e}")
                config[name] = parse_env_value(value)
    os.environ["CONFIG_STR"] = json.dumps(config)


def parse_env_value(value: str) -> Union[str, bool]:
    if value.lower() == "false":
        return False
    elif value.lower() == "true":
        return True
    return value


def read_file(file_path: str) -> str:
    with open(file_path, "r") as f:
        return f.read()


def conf() -> Config:
    return config
