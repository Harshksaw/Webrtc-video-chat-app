FROM node:18-alpine

WORKDIR /app

# Install PeerJS server globally
RUN npm install -g peer

# Expose the default PeerJS port
EXPOSE 9000

# Start PeerJS server
CMD ["peerjs", "--port", "9000", "--path", "/"]
