import { baseGet } from "./baseGet";
import { useQuery } from "react-query";
import { useState } from "react";

const treeify = (list, idAttr, parentAttr, childrenAttr) => {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'parent';
    if (!childrenAttr) childrenAttr = 'children';
    var treeList = [];
    var nodeidList = []
    var lookup = {};
    list.forEach(function (obj) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
        nodeidList.push(obj[idAttr].toString())
    });
    list.forEach(function (obj) {
        if (obj[parentAttr] != null) {
            if (lookup[obj[parentAttr]] !== undefined) {
                lookup[obj[parentAttr]][childrenAttr].push(obj);
            } else {
                treeList.push(obj);
            }
        } else {
            treeList.push(obj);
        }
    });
    return [treeList, nodeidList];
};

export const useGetMemoryTree = (value) => {
    const [root_node, setRootNode] = useState(null);
    const [default_expand_node, setDefaultExpandNode] = useState([])
    const [total_node, setTotalNode] = useState(null)
    const { refetch } = useQuery(["MemoryTreeData", value], () => baseGet(`/frontend-api/memory-tree?page=${value}`), {
        retry: false,
        refetchInterval: 15000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (data) {
                var make_tree = treeify(data.results)
                setRootNode(make_tree[0])
                setDefaultExpandNode(make_tree[1])
                if (data.count) {
                    setTotalNode(data.count)
                }
            }
        }
    }
    )
    return {
        root_node: root_node,
        default_expand_node: default_expand_node,
        total_node: total_node,
        refetch: refetch
    }
}

