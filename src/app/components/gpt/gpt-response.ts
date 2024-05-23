export interface GPTResponse {
    id : string
    choices: [
      {
        message: {
          content: string;
        }
      }
    ];
  }