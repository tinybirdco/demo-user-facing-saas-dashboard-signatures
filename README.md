# Build real-time analytics dashboard using Tinybird

This repo contains all the resources you need to build a real-time analytics dashboard using Tinybird, Tremor, and Next.js. The dashboard created here is based on a signature tracking app (e.g. DocuSign) use case, and provides real-time analytics on user activity and signature metrics.

For a complete tutorial on how to build a real-time dashboard from scratch, read the accompanying Tinybird guide [here](https://www.tinybird.co/docs/guides/tutorials/user-facing-web-analytics).

### Prerequisites

- Node.js >= v18
- Python >= v3.8

## Instructions

Follow these instructions to deploy the working version of this application.

### 0. Create a free Tinybird Workspace

First, create a [free Tinybird account](https://www.tinybird.co/signup?referrer=github&utm_source=github&utm_medium=github&utm_content=real-time-dashboard). 

[![Deploy to Tinybird](https://cdn.tinybird.co/button)](https://ui.tinybird.co/workspaces/new?name=signatures_dashboard)

### 1. Clone the repository

```bash
git clone https://github.com/tinybirdco/signatures-dashboard.git
cd signatures-dashboard
```

### 2. Install dependencies

Install app dependencies and datagen dependencies. From the root of the repo:

```bash
cd app
npm install
cd ../datagen
npm install
```

### 3. Install the Tinybird CLI

From the root of the repo:

```bash
python -m venv .venv
source .venv/bin/activate
pip install tinybird-cli
```

### 4. Authenticate to Tinybird

Copy your User Admin Token from the Tinybird UI. Your user admin token is the token with the format admin <your email address>.

From the root directory, run the following command:

```sh
export TB_TOKEN=<your user admin token>
tb auth
```

> :warning: Your token and workspace details will be stored in a .tinyb file. If you intend to push this to a public repository, add the `.tinyb` to your `.gitignore`.

### 5. Add your Tinybird host and token to .env

In the app directory, first create a new file `.env.local`
```bash
cd app
cp .env.example .env.local
```

You need to copy your Tinybird host and token to the `.env.local` file in your directory:

```bash
NEXT_PUBLIC_TINYBIRD_HOST=your_tinybird_host # (e.g. https://api.tinybird.co)
NEXT_PUBLIC_TINYBIRD_TOKEN=your_tinybird_token
```

### 6. Push the resources to Tinybird


This repo has two `.datasource` files representing Tinybird [Data Sources](https://www.tinybird.co/docs/concepts/data-sources.html) and four `.pipe` files representing Tinybird [Pipes](https://www.tinybird.co/docs/concepts/pipes.html). The Data Sources will hold data that gets ingested into Tinybird, and the Pipes define the way that data gets transformed and exposed as APIs in real-time. For more information on Data Sources and Pipes, click those links above.

To deploy your real-time data pipelines, push the resources in your repository to the Tinybird server:

```bash
tb push tinybird/
```

### 7. Stream mock data to Tinybird

This repository includes a data-generating script called `mockDataGenerator.js` that creates mock data and sends it to Tinybird via the [Tinybird Events API](https://www.tinybird.co/docs/ingest/events-api.html).

To send mock data to Tinybird, use the `seed` script:

```bash
cd datagen
npm run seed
```

Leave this script running in the background so you can visualize data in real-time.

## 8. Run the dashboard locally

To view the dashboard on your machine, run it locally:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The dashboard includes 4 Tremor visual components plus a `DatePicker`. You can add, augment, and adjust to build your own real-time dashboard.

## Contributing

If you find any issues or have suggestions for improvements, please submit an issue or a [pull request](https://github.com/tinybirdco/demo-user-facing-analytics-color-picker/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

## License

This code is available under the MIT license. See the [LICENSE](https://github.com/tinybirdco/demo-user-facing-analytics-color-picker/blob/main/LICENSE.txt) file for more details.

## Need help?

&bull; [Community Slack](https://www.tinybird.co/community) &bull; [Tinybird Docs](https://www.tinybird.co/docs) &bull;

## Authors

- [Joe Karlsson](https://github.com/joekarlsson)
- [Cameron Archer](https://github.com/tb-peregrine)
- [Lucy Mitchell](https://github.com/ioreka)
- [Julia Vallina](https://github.com/juliavallina)
