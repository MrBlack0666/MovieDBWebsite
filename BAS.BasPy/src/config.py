import jsons

config = None

class Config:
    def __init__(self):
        self.fields = None
        self.environment = 'Production'
        self.load_config()

    def load_config(self):
        config_path = 'appsettings.json'
        if self.environment == 'Development':
            config_path = 'appsettings.Development.json'
        elif self.environment == 'Production':
            config_path = 'appsettings.json'
        file_handle = open(config_path, "r")
        self.fields = jsons.loads(file_handle.read())
        global config
        config = self

def get_config():
    if config:
        return config
    return Config()

def create_config():
    global config
    config = Config()
