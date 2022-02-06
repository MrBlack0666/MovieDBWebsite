import pyodbc
import config

class MovieDbContext:
    def __init__(self):
        self.config = config.get_config()

    def get_connection(self):
        connection = pyodbc.connect(self.config.fields['connectionStrings']['movieDatabase'])
        return connection
