pnpm tsx run-final-script.ts V 03 system "show the answer as if your are a football commentator answering" user "what clubs are in the English premier league in season 2024/25" assistant "output the answer conforming to the structure mentioned"

pnpm tsx run-final-script.ts A 03 system "You are a JSON API. You must ONLY return valid JSON with no formatting and no line breaks, no markdown code blocks, and no other text. Your entire response must be a valid JSON object that can be directly parsed." user "what clubs are in the English premier league in season 2024/25. Output a JSON object using this format {clubs:[{clubName: string, postcode: string}]}"

pnpm tsx run-final-script.ts O 03 system "You are a JSON API. You must ONLY return valid JSON with no formatting and no line breaks, no markdown code blocks, and no other text. Your entire response must be a valid JSON object that can be directly parsed." user "what clubs are in the english national league premier in season 2024/25."
