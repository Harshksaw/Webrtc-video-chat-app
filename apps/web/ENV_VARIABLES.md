# Environment Variables

## Production Defaults (Built-in)

Your app is **ready for deployment** with these built-in production defaults:

| Variable | Production Default | Development Default |
|----------|-------------------|---------------------|
| `NEXT_PUBLIC_SOCKET_URL` | `https://webrtc-video-chat-app.onrender.com` | `http://localhost:3001` |
| `NEXT_PUBLIC_PEER_HOST` | `webrtc-video-chat-app.onrender.com` | `localhost` |
| `NEXT_PUBLIC_PEER_PORT` | `443` | `9000` |
| `NEXT_PUBLIC_PEER_PATH` | `/peerjs` | `/peerjs` |
| `NEXT_PUBLIC_PEER_SECURE` | `true` | `false` |

## Optional: Override in Vercel

If you deploy a **separate PeerJS server**, add these environment variables in Vercel:

```bash
# Only needed if using a separate PeerJS server
NEXT_PUBLIC_PEER_HOST=your-peerjs-server.onrender.com
NEXT_PUBLIC_PEER_PORT=443
NEXT_PUBLIC_PEER_PATH=/
```

## Local Development

For local development, create `.env.local`:

```bash
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_PEER_HOST=localhost
NEXT_PUBLIC_PEER_PORT=9000
NEXT_PUBLIC_PEER_PATH=/peerjs
```

> **Note**: The app works out-of-the-box without any environment variables!
