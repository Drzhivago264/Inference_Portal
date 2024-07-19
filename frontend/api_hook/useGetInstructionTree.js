import { useEffect, useState } from "react";

import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetInstructionTree = (editorref, setEditor) => {
    const [template_list, setTemplateList] = useState([]);
    const [default_child_template_list, setDefaultChildTemplateList] = useState([]);
    const [default_parent_instruct, setParentInstruct] = useState("");
    const [default_child_instruct, setChildInstruct] = useState("");
    const [user_template_list, setUserTemplateList] = useState([]);
    const [default_user_child_template_list, setDefaultUserChildTemplateList] = useState([]);
    const [default_user_parent_instruct, setUserParentInstruct] = useState("");
    const [default_user_child_instruct, setUserChildInstruct] = useState("");
    const [choosen_template, setChoosenTemplate] = useState("Assignment Agent");
    const [choosen_user_template, setChoosenUserTemplate] = useState("");
    const {
        status: status,
        data: data,
        error: error,
        isLoading: isLoading,
    } = useQuery("InstructionTreeData", () => baseGet("/frontend-api/instruction-tree"), { refetchOnWindowFocus: false, retry: true });
    useEffect(() => {
        if (status == "success") {
            setTemplateList(data.root_nodes)
            setUserTemplateList(data.user_root_nodes)
            if (data.user_root_nodes.length > 0) {
                setChoosenUserTemplate(data.user_root_nodes[0].displayed_name)
                setUserParentInstruct(data.user_root_nodes[0].instruct)
            }
            setChildInstruct(data.default_children[0].instruct)
            if (data.default_user_children.length > 0) {
                setUserChildInstruct(data.default_user_children[0].instruct)
            }
            setDefaultChildTemplateList(data.default_children)
            setDefaultUserChildTemplateList(data.default_user_children)
            if (editorref) {
                editorref.current.isReady
                    .then(() => {
                        for (var node in data.root_nodes) {
                            if (data.root_nodes[node].name == choosen_template) {
                                setParentInstruct(data.root_nodes[node].instruct)
                                setEditor(JSON.parse(data.root_nodes[node].default_editor_template))
                                editorref.current.render(JSON.parse(data.root_nodes[node].default_editor_template))
                            }
                        }
                    })
                    .catch((reason) => {
                        console.log(`Editor.js initialization failed because of ${reason}`)
                    });
            }
            else {
                for (var node in data.root_nodes) {
                    if (data.root_nodes[node].name == choosen_template) {
                        setParentInstruct(data.root_nodes[node].instruct)
                    }
                }
            }
        }
    }, [status, data]);
    return {
        template_list: template_list,
        setTemplateList: setTemplateList,
        default_child_instruct: default_child_instruct,
        setChildInstruct: setChildInstruct,
        default_child_template_list: default_child_template_list,
        setDefaultChildTemplateList: setDefaultChildTemplateList,
        choosen_template: choosen_template,
        setChoosenTemplate: setChoosenTemplate,
        default_parent_instruct: default_parent_instruct,
        setParentInstruct: setParentInstruct,
        user_template_list: user_template_list,
        setUserTemplateList: setUserTemplateList,
        default_user_child_template_list: default_user_child_template_list,
        setDefaultUserChildTemplateList: setDefaultUserChildTemplateList,
        default_user_parent_instruct: default_user_parent_instruct,
        setUserParentInstruct: setUserParentInstruct,
        choosen_user_template: choosen_user_template,
        setChoosenUserTemplate: setChoosenUserTemplate,
        default_user_child_instruct: default_user_child_instruct,
        setUserChildInstruct: setUserChildInstruct,
        error: error,
        isLoading: isLoading
    }
}