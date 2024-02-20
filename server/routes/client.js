import path from "path";

export const client = (request, response) => response.sendFile(`${path.resolve()}/bundle/index.html`);
