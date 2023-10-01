import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTAPI } from 'chatgpt';

type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

      const {message} = req.query;
      if (message == null) {
        res.status(400).json({ response: "Message Parameter Missing" });
    }
      const api = new ChatGPTAPI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    });

    const openAiRes = await api.sendMessage(String(message));
    res.status(200).json({ response: openAiRes.text });
}
