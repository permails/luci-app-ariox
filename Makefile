#
# Copyright (C) 2026 permails <logo@permails.com>
#
# This is free software, licensed under the MIT License.
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI Support for Ariox
LUCI_DEPENDS:=+luci-base +aria2 +luci-nginx

PKG_MAINTAINER:=konvict <logo@permails.com>
PKG_LICENSE:=MIT

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
