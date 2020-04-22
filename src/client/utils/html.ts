interface HTMLProps {
    content: string;
    title: string;
    description?: string;
    author?: string
}

function html({content, title, description, author}: HTMLProps): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <meta name="description" content="${description}">
          <meta name="author" content="${author}">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
          <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        </head>
        <body>
            ${content}
        </body>
    </html>`
}

export default html;