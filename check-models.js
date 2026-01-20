// check-models.js
const apiKey = process.env.GEMINI_API_KEY;

async function check() {
  console.log("-----------------------------------------");
  console.log("🔍 DIAGNOSTIC: Checking available models...");

  if (!apiKey) {
    console.error("❌ ERROR: No API Key found. Run with: node --env-file=.env.local check-models.js");
    return;
  }

  try {
    // We use a direct fetch because it gives better error messages than the SDK
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API ERROR:");
      console.error(`   Code: ${data.error.code}`);
      console.error(`   Message: ${data.error.message}`);
      console.log("\n💡 FIX: If the message says 'API has not been used', click the URL in the error to enable it.");
    } else {
      console.log("✅ SUCCESS! Your API Key is valid.");
      console.log("   Here are the models you can use:");
      
      const models = data.models.map(m => m.name.replace('models/', ''));
      const usefulModels = models.filter(m => m.includes('gemini'));
      
      usefulModels.forEach(m => console.log(`   - ${m}`));
      
      console.log("\n👇 ACTION: Copy one of the names above into your 'GeminiAIModals.js' file.");
    }
  } catch (error) {
    console.error("Network Error:", error);
  }
  console.log("-----------------------------------------");
}

check();