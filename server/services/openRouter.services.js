import axios from "axios"

export const askAi = async (messages) => {
    try {
        if(!messages || !Array.isArray(messages) || messages.length==0){
            throw new error("Messages array is empty.");
        }
        const response=await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages:messages
            },
           { 
            headers:{
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            }
            }
        )

        const content=response?.data?.choices?.[0]?.message?.content;

        if(!content || !content.trim()){
            throw new Error("AI returned empty response.");
        }

        return content;
    } 
    catch (error) {
        console.error("OpenRouter Error:",error.response?.data || error.message);
        throw new Error("OpenRouter API Error")
        
    }
}

// link to understand-->https://chatgpt.com/share/6ade35d4-a9f4-83e8-827d-c38e7d828660