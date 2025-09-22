import { type NextRequest, NextResponse } from "next/server"

// Mock IoT data endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sensor = searchParams.get("sensor")
    const timeRange = searchParams.get("timeRange") || "24h"

    // Generate mock sensor data
    const generateSensorData = (sensorId: string) => {
      const data = []
      const now = new Date()
      const hours = timeRange === "7d" ? 168 : 24

      for (let i = hours; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)

        data.push({
          timestamp: timestamp.toISOString(),
          moisture: Math.round((20 + Math.random() * 15) * 10) / 10,
          temperature: Math.round((22 + Math.random() * 8) * 10) / 10,
          humidity: Math.round((60 + Math.random() * 20) * 10) / 10,
          ph: Math.round((6.5 + Math.random() * 1) * 10) / 10,
          sensorId,
        })
      }

      return data
    }

    if (sensor) {
      // Return data for specific sensor
      const data = generateSensorData(sensor)
      return NextResponse.json({ data })
    } else {
      // Return data for all sensors
      const sensors = ["A1", "A2", "B1", "B2", "C1"]
      const allData = sensors.reduce(
        (acc, sensorId) => {
          acc[sensorId] = generateSensorData(sensorId)
          return acc
        },
        {} as Record<string, any[]>,
      )

      return NextResponse.json({ data: allData })
    }
  } catch (error) {
    console.error("IoT data API error:", error)
    return NextResponse.json({ error: "Failed to fetch IoT data" }, { status: 500 })
  }
}

// Mock endpoint for latest sensor readings
export async function POST(request: NextRequest) {
  try {
    const { sensorId, data } = await request.json()

    // In a real implementation, this would save data to a database
    console.log("Received sensor data:", { sensorId, data })

    // Check for threshold violations and trigger alerts
    const alerts = []

    if (data.moisture < 20) {
      alerts.push({
        type: "critical",
        message: `Low soil moisture detected: ${data.moisture}%`,
        sensor: sensorId,
      })
    }

    if (data.temperature > 35) {
      alerts.push({
        type: "warning",
        message: `High temperature detected: ${data.temperature}°C`,
        sensor: sensorId,
      })
    }

    return NextResponse.json({
      success: true,
      alerts,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("IoT data submission error:", error)
    return NextResponse.json({ error: "Failed to process sensor data" }, { status: 500 })
  }
}
