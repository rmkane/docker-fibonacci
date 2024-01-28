# Docker Fibonacci

Navigate to: <http://localhost:3050>

## Dev build

```sh
docker-compose -f docker-compose-dev.yml up
docker-compose -f docker-compose-dev.yml up --build
docker-compose -f docker-compose-dev.yml down
```

## Docker run AWS

Here is the `Dockerrun.aws.json` file:

```json
{
  "AWSEBDockerrunVersion": "2",
  "containerDefinitions": [
    {
      "name": "client",
      "image": "rmkane/multi-client",
      "hostname": "client",
      "essential": false
    },
    {
      "name": "server",
      "image": "rmkane/multi-server",
      "hostname": "api",
      "essential": false
    },
    {
      "name": "worker",
      "image": "rmkane/multi-worker",
      "hostname": "worker",
      "essential": false
    },
    {
      "name": "nginx",
      "image": "rmkane/multi-nginx",
      "hostname": "nginx",
      "essential": true,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        }
      ],
      "links": ["client", "server"]
    }
  ]
}
```
