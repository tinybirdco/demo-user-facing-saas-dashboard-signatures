# Tinybird Data Project

This folder contains all of the resources to build the Tinybird data project for this demo.

## Data Project Structure

This data project contains X Data Sources, Y Endpoints, and X additional Pipes.

```
├── datasources
│   └── accounts.datasource
│   └── signatures.datasource
├── endpoints
│   └── ranking_of_top_organizations_creating_signatures.pipe
```

### Lineage Graph

![Tinybird Data Flow](/img/data_flow.png "Tinybird Data Flow")

## Deploying the Tinybird resources

To deploy these resources to the server, run the following from this directory:

```sh
tb auth --token <your user admin token>
tb push --force
```
