import { InfluxDBClient, Point } from "@influxdata/influxdb3-client";

async function write(client, database) {
  try {

    const points = [
      Point.measurement("census")
        .setTag("location", "Klamath")
        .setIntegerField("bees", 23),
      Point.measurement("census")
        .setTag("location", "Portland")
        .setIntegerField("ants", 30),
      Point.measurement("census")
        .setTag("location", "Klamath")
        .setIntegerField("bees", 28),
      Point.measurement("census")
        .setTag("location", "Portland")
        .setIntegerField("ants", 32),
      Point.measurement("census")
        .setTag("location", "Klamath")
        .setIntegerField("bees", 29),
      Point.measurement("census")
        .setTag("location", "Portland")
        .setIntegerField("ants", 40),
    ];

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      await client
        .write(point, database)
        // separate points by 1 second
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)));
    }
  } catch (e) {
    console.log(e);
  }
}

async function read(client){
  try{
    const query = `SELECT * FROM 'census' 
    WHERE time >= now() - interval '24 hours' AND 
    ('bees' IS NOT NULL OR 'ants' IS NOT NULL) order by time asc`

    const rows = await client.query(query, 'intern')

    console.log(`${"ants".padEnd(5)}${"bees".padEnd(5)}${"location".padEnd(10)}${"time".padEnd(15)}`);
    for await (const row of rows) {
        let ants = row.ants || '';
        let bees = row.bees || '';
        let time = new Date(row.time);
        console.log(`${ants.toString().padEnd(5)}${bees.toString().padEnd(5)}${row.location.padEnd(10)}${time.toString().padEnd(15)}`);
    }
  }
  catch(e){
    console.log(e);
  }
}

async function main() {
  const client = new InfluxDBClient({
    host: "https://us-east-1-1.aws.cloud2.influxdata.com",
    token:
      "0YgGlzDbSvAk3izAfNAzF6ukH7ymN0e6s1cQwJ6AY8AlHJq4rQ3XuqO8ta2Xc0ZXRgfcuz3cc2X8K0puLuZ7Hw==",
  });

  const database = "intern"; 

  // await write(client, database);
  await read(client)

  console.log("Successfull");
}

main();
