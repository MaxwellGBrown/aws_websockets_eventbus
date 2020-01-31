"""Connect to the API gateway in the associated template."""
import asyncio
import json
import sys

import websockets


async def main(uri):
    """Connect to websocket and send/read messages."""
    print("Making a connection")
    async with websockets.connect(uri, ssl=True) as websocket:
        print("Connected!")

        print("Sending message")
        # await websocket.send(json.dumps({"action": "Hello World"}))
        await websocket.send("World")
        print("Message sent!")

        try:
            while response := await websocket.recv():
                print(f'Got message! {response!r}')
        except KeyboardInterrupt:
            pass

        print("Disconnecting!")
    print("Disconnected!")


if __name__ == "__main__":
    uri = sys.argv[1]

    asyncio.get_event_loop().run_until_complete(main(uri))
