This repo contains all the resources you need to build a real-time analytics dashboard using Tinybird, Tremor, and Next.js. The dashboard created here is based on a signature tracking app (e.g. DocuSign) use case, and provides real-time analytics on user activity and signature metrics.

For a complete tutorial on how to build a real-time dashboard from scratch, read the accompanying Tinybird blog post [here](https://www.tinybird.co/blog-posts/real-time-dashboard-step-by-step).

## Getting Started

### Prerequisites

- Node.js >= v18
- Python >= v3.8

### Set up your Tinybird account and Workspace

To build this real-time dashboard, you need a free Tinybird account. You can sign up for your account [here](https://www.tinybird.co/signup?referrer=github&utm_source=github&utm_medium=github&utm_content=real-time-dashboard).

Once you've signed up, click this button to deploy a new Workspace to your Tinybird account.

[![Deploy to Tinybird](https://cdn.tinybird.co/button)](https://ui.tinybird.co/workspaces/new?name=signatures_dashboard)

### Set up the repository locally

First, clone the repo:

```bash
git clone https://github.com/tinybirdco/signatures-dashboard.git
cd signatures-dashboard
```

Then, install dependencies:

```bash
npm install
```

### Set up the Tinybird CLI

Next, install the Tinybird CLI. This will be needed for local authentication to send mock data to your Tinybird Data Source (or if you'd like to use the CLI to work on your Tinybird resources locally):

```bash
python -mvenv .e
. .e/bin/activate
pip install tinybird-cli
tb auth
```

Copy your User Admin token from your workspace (you can find it [here](https://ui.tinybird.co/tokens)) and paste it into the prompt.

Authenticating will create a `.tinyb` file in your project directory.

⚠️Warning! The `.tinyb` contains your User Admin token. Don't share it or publish it in your application. For more detailed information on Token management in Tinybird, read [the docs](https://www.tinybird.co/docs/api-reference/token-api.html).

### Create environment variables for local dev

You need to copy your Tinybird host and token to the `.env.local` file in your directory:

```bash
NEXT_PUBLIC_TINYBIRD_HOST=your_tinybird_host # (e.g. api.tinybird.co)
NEXT_PUBLIC_TINYBIRD_TOKEN=your_tinybird_token
```

## Set up data pipelines in Tinybird

### Push Data Sources and Pipes to Tinybird server

This repo has two `.datasource` files representing Tinybird [Data Sources](https://www.tinybird.co/docs/concepts/data-sources.html) and four `.pipe` files representing Tinybird [Pipes](https://www.tinybird.co/docs/concepts/pipes.html). The Data Sources will hold data that gets ingested into Tinybird, and the Pipes define the way that data gets transformed and exposed as APIs in real-time. For more information on Data Sources and Pipes, click those links above.

To deploy your real-time data pipelines, push the resources in your repository to the Tinybird server:

```bash
tb push data-project/
```

### Stream mock data to Tinybird

This repository includes a data-generating script called `mockDataGenerator.js` that creates mock data and sends it to Tinybird via the [Tinybird Events API](https://www.tinybird.co/docs/ingest/events-api.html).

To send mock data to Tinybird, use the `seed` script:

```bash
npm run seed
```

Leave this script running in the background so you can visualize data in real-time.

## Run the dashboard locally

To view the dashboard on your machine, run it locally:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The dashboard includes 4 Tremor visual components plus a `DatePicker`. You can add, augment, and adjust to build your own real-time dashboard.

## Why Tinybird?

Tinybird provides out-of-the-box real-time data infrastructure for your dashboards. With Tinybird you can unify batch and streaming data sources, build real-time data products with SQL, and publish them as APIs.

There are a few things that make Tinybird great for building real-time, user-facing dashboards:

1. **Easy data ingestion**: Tinybird makes it simple to connect streaming and batch data sources through its suite of native connectors. Send data to Tinybird from streaming sources, databases, data warehouses, file systems, or with a simple HTTP request.

2. **Low-latency, high-concurrency**: Tinybird is optimized for real-time data. Based on the world's fastest OLAP technology, Tinybird allows you to ingest streaming data at thousands+ events per second and run complex aggregating queries over billions of rows of data in milliseconds.

3. **SQL-based real-time pipelines**: You can easily design and deploy real-time APIs using [Pipes](https://www.tinybird.co/docs/concepts/pipes.html), a developer-oriented interface for build SQL-based real-time pipelines that can be instantly published as REST APIs.

4. **Scalable architecture**: Tinybird is a scalable, serverless real-time data platform. It flexibly scales storage and compute resources on demand. As your data volume and user load increases, Tinybird responds to ensure fast dashboards at scale.

5. **Excellent compatibility with Next.js and Tremor**: Tinybird's architecture and APIs are designed to work seamlessly with modern frontend frameworks like Next.js. Tinybird's [Vercel Integration](https://www.tinybird.co/docs/guides/integrating-vercel.html) makes it easy to deploy and manage end-to-end data projects quickly.

## Admin stuff

### License

This project is licensed under the MIT License.

### Need help?

&bull; [Community Slack](https://www.tinybird.co/join-our-slack-community) &bull; [Tinybird Docs](https://docs.tinybird.co/) &bull;

## Authors

- [Joe Karlsson](https://github.com/joekarlsson)
- [Cameron Archer](https://github.com/tb-peregrine)
