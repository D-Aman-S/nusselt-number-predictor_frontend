const serverUrl = "http://127.0.0.1:5000/";
export async function POST(request: Request) {
  try {
    // Data to send in the request body
    const payload = await request.json();
    console.log("Payload received:", payload);
    // Make an HTTP POST request to your Flask API endpoint
    const response = await fetch(serverUrl + "predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful
    if (response.ok) {
      // Parse the response as JSON
      const data = await response.json();

      // Return the data
      return Response.json(data);
    }
  } catch (error: any) {
    return Response.json({
      message: "Document was not fetched!!",
      error: error.response.message,
    });
  }
}
