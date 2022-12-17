from sqlalchemy import create_engine, inspect
import pandas as pd

class SQLHelper():
    
    def __init__(self):
        self.database_path = "Resources/hawaii.sqlite"
        self.connection_str = f"sqlite:///{self.database_path}"
        self.engine = create_engine(self.connection_str)


    def executeQuery(self, query):
        df = pd.read_sql(query, self.engine)
        return(df)

    
    def getPrecipitation(self):
        query =  """
                    SELECT
                        date,
                        prcp
                    FROM
                        measurement
                    WHERE
                        date >= '2016-08-23'
                        AND prcp is not null;
                """
        return(self.executeQuery(query))
    
    def getStations(self):
        query =  """
                    SELECT
                        *
                    FROM
                        station
                    ORDER BY
                        station desc;
                """

        return(self.executeQuery(query))

    def getTobs(self):
        query =  """
                    SELECT
                        m.station,
                        m.date,
                        m.tobs
                        
                    FROM
                        measurement m
                    WHERE
                        m. station = 'USC00519281'
                        AND m. date >='2016-08-23'
                        AND m. tobs is not null
                    ORDER BY
                        m.date desc;
                """
        return(self.executeQuery(query))


    def getDataSinceStartDate(self, start):
        query = """
                    SELECT
                        station,
                        min(tobs) as min,
                        max(tobs) as max,
                        avg(tobs) as avg
                     FROM
                        measurement 
                    WHERE
                        date >= '{start}';
                """
        return(self.executeQuery(query))

    def getDataRange(self,start,end):
        query = """
                    SELECT
                        station,
                        min(tobs) as min,
                        max(tobs) as max,
                        avg(tobs) as avg
                     FROM
                        measurement 
                    WHERE
                       date >= '{start}'
                       AND date <= '{end}';
                """
        return(self.executeQuery(query))