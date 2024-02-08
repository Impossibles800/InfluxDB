import dotenv from "dotenv";
import { InfluxDBClient, Point } from "@influxdata/influxdb3-client";

dotenv.config();

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
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)));
    }

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      await client
        .write(point, database)
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)));
    }
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  const client = new InfluxDBClient({
    host: 'https://us-east-1-1.aws.cloud2.influxdata.com',
    token: '0YgGlzDbSvAk3izAfNAzF6ukH7ymN0e6s1cQwJ6AY8AlHJq4rQ3XuqO8ta2Xc0ZXRgfcuz3cc2X8K0puLuZ7Hw==',
  });

  const database = "your_database_name"; // Replace "your_database_name" with your actual database name

  await write(client, database);
}

main();
