#!/usr/bin/env python
import copy
import logging


class InternalStorage(object):
    def __init__(self, cluster_conf, service_conf, default_service_conf):
        self.cluster_conf = cluster_conf
        self.service_conf = self.merge_service_configuration(service_conf, default_service_conf)
        self.logger = logging.getLogger(__name__)

    @staticmethod
    def merge_service_configuration(overwrite_srv_cfg, default_srv_cfg):
        if overwrite_srv_cfg is None:
            return default_srv_cfg
        srv_cfg = default_srv_cfg.copy()
        for k in overwrite_srv_cfg:
            srv_cfg[k] = overwrite_srv_cfg[k]
        return srv_cfg

    def validation_pre(self):
        print(self.cluster_conf)
        print(self.service_conf)
        return True, None

    def run(self):
        result = copy.deepcopy(self.service_conf)
        return result

    def validation_post(self, conf):
        return True, None
