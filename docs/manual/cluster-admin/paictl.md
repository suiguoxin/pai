# paictl

## Introduction

**paictl** is a command line tool, which is used to control OpenPAI clusters, such as start/stop/refresh a service, get cluster config, etc.

paictl suports the following commands:

* [./paictl.py layout](#paictl-layout)
* [./paictl.py check](#paictl-check)
* [./paictl.py config](#paictl-config)
* [./paictl.py cluster](#paictl-cluster)
* [./paictl.py service](#paictl-service)
* [./paictl.py machine](#paictl-machine)
* [./paictl.py utility](#paictl-utility)

## Commands

### ./paictl.py layout

* Description

  Generate `layout.yaml` file to assigned output folder.

* Usage

``` bash
  paictl layout [OPTIONS]
```

* Options

    | Name, shorthand  | Required |         Default        |                 Description                        |
    |------------------|----------|------------------------|----------------------------------------------------|
    | --output, -o     | False    | /cluster-configuration |        Output directory of layout.yaml             |
    | --force, -f      | False    |           False        |         Force to overwrite                         |

* Examples

  > generate a new layout.yaml to /cluster-configuration and overwrite existing file

``` bash
    ./paictl.py layout --force
```

### ./paictl.py check

* Description

  check layout.

* Usage

``` bash
  ./paictl.py check [OPTIONS]
```

* Options

    | Name, shorthand   | Required | Default |                 Description                        |
    |-------------------|----------|---------|----------------------------------------------------|
    | --config-path, -p |  True    |         |        path of cluster configuration file          |

* Examples

  > check with layout.yaml under /cluster-configurations

``` bash
    ./paictl.py check --config-path /cluster-configuration
```

### ./paictl.py config

configuration operations

#### ./paictl.py config generate (**userless**) (**lack examples**)

* Description

  Generate configuration files based on a quick-start yaml file

* Usage

``` bash
  ./paictl.py config generate [OPTIONS]
```

* Options

    | Name, shorthand   | Required |   Default  |                                Description                            |
    |-------------------|----------|------------|-----------------------------------------------------------------------|
    | --input, -i       |  True    |            | path of the quick-start configuration file (yaml format) as the input |
    | --output, -o      |  True    |            | path of the directory the configurations will be generated to         |
    | --force, -f       |  False   |  False     |                   overwrite existing files                            |

* Examples

  > check with layout.yaml under /cluster-configurations

``` bash
    ./paictl.py config generate --input /cluster-configuration
```

#### ./paictl.py config push

* Description

  Push configuration to kubernetes cluster as configmap.

* Usage

``` bash
  ./paictl.py config push [OPTIONS]
```

* Options

    | Name, shorthand                  | Required |     Default      |                                Description                                            |
    |----------------------------------|----------|------------------|---------------------------------------------------------------------------------------|
    | --cluster-conf-path, -p          |  False   |     None         | path of directory which stores the cluster configuration                              |
    | --external-storage-conf-path, -e |  False   |     None         | the path of external storage configuration                                            |
    | --push-mode, -m                  |  False   |     all          | the mode to push configuration. service mode won't push the k8s related configuration |
    | ----kube-config-path -c          |  False   |  ~/.kube/config  | The path to KUBE_CONFIG file                                                          |

* Examples

  > Push services configuration under /cluster-configuration to kubernetes cluster as configmap

``` bash
    ./paictl.py config push -p /cluster-configuration/ -m service
```

#### ./paictl.py config pull

* Description

 Get the configuration stored in the k8s cluster.

* Usage

``` bash
  ./paictl.py config pull [OPTIONS]
```

* Options

    | Name, shorthand          | Required |     Default      |                                Description                                |
    |--------------------------|----------|------------------|---------------------------------------------------------------------------|
    | --config-output-path, -o |  True    |                  | the path of the directory to store the configuration downloaded from k8s  |
    | ----kube-config-path -c  |  False   |  ~/.kube/config  | The path to KUBE_CONFIG file                                              |

* Examples

  > Pull configuration and save in local folder /cluster-configuration

``` bash
    ./paictl.py config pull -o /cluster-configuration
```

#### ./paictl.py config get-id

* Description

 Get the cluster-id stored in the k8s cluster.

* Usage

``` bash
  ./paictl.py config get-id [OPTIONS]
```

* Options

    | Name, shorthand          | Required |     Default      |      Description             |
    |--------------------------|----------|------------------|------------------------------|
    | ----kube-config-path -c  |  False   |  ~/.kube/config  | The path to KUBE_CONFIG file |

* Examples

  > Get the cluster-id stored in the k8s cluster with KUBE_CONFIG file under ~/.kube/config

``` bash
    ./paictl.py config get-id
```

#### ./paictl.py config external-config-update (**lack examples**)

* Description

 Update configuration of external storage where you could configure the place to sync the latest cluster configuration

* Usage

``` bash
  ./paictl.py config external-config-update [OPTIONS]
```

* Options

    |         Name, shorthand          | Required |     Default      |                Description                  |
    |----------------------------------|----------|------------------|---------------------------------------------|
    | --extneral-storage-conf-path, -e |  True    |                  | the path of external storage configuration  |
    | ----kube-config-path -c          |  False   |  ~/.kube/config  | The path to KUBE_CONFIG file                |

* Examples

  > Pull configuration and save in local folder /cluster-configuration

``` bash
    ./paictl.py config pull -o /cluster-configuration
```

### ./paictl.py cluster

cluster operations

#### ./paictl.py cluster k8s-bootup (deprecated ?)

#### ./paictl.py cluster k8s-clean (deprecated)

* Description

 bootup kubernetes

* Usage

``` bash
  ./paictl.py cluster k8s-bootup [OPTIONS]
```

* Options

    | Name, shorthand | Required |  Default |          Description               |
    |-----------------|----------|----------|------------------------------------|
    | -conf-path, -p  |  True    |          | path of cluster configuration file |

* Examples

  > bootup kubernetes

``` bash
    ./paictl.py config pull -o /cluster-configuration
```

### ./paictl.py service

### ./paictl.py machine

### ./paictl.py utility
