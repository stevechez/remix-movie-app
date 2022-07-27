export type CommentEntry = {
    name: string;
    message: string;
    filmId: string;
  };
  
  export async function getComments(filmId: string) {
    const response = await fetch(
      `http://localhost:3002/comments?filmId=${filmId}`
    );
  
    return response.json();
  }
  
  export async function addComment(comment: CommentEntry) {
    const response = await fetch('http://localhost:3002/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return response.json();
  }