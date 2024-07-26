import { baseGet } from "./baseGet";
import { nanoid } from 'nanoid'
import { useQuery } from "react-query";

export const useGetUserInstruction = (selectedIndex,  setMaxChildNum, setMaxParentNum, setAddParentError, setTemplateList, setChildInstructionList) => {
    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    } = useQuery("DatasetList", () => baseGet("/frontend-api/get-user-instruction"),
    
        {   retry: false, 
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                if (data.status != 204) {
                    setMaxChildNum(data.max_child_num)
                    setMaxParentNum(data.max_parent_num)
                    let template_list = []
                    if (data.root_nodes.length >= data.max_parent_num) {
                        setAddParentError(true)
                    }
                    if (data.root_nodes.length == 0) {
                        setTemplateList([{
                            'template_list_index': 0,
                            'id': null,
                            'displayed_name': "Empty Template",
                            'instruct': "",
                            'children': [{
                                'id': null,
                                'displayed_name': "",
                                'instruct': "",
                                'unique': nanoid(),
                                'add': false
                            }],
                        }])
                    }
                    else {
                        for (let template in data.root_nodes) {
                            if (template == selectedIndex) {
                                let default_child_instruction = []
                                for (let c in data.root_nodes[template].children) {
                                    default_child_instruction.push({
                                        'id': data.root_nodes[template].children[c]['id'],
                                        'displayed_name': data.root_nodes[template].children[c]['displayed_name'],
                                        'instruct': data.root_nodes[template].children[c]['instruct'],
                                        'add': false
                                    })
                                }
                                setChildInstructionList(default_child_instruction)
                            }
                            template_list.push({
                                'id': data.root_nodes[template]['id'],
                                'displayed_name': data.root_nodes[template]['displayed_name'],
                                'instruct': data.root_nodes[template]['instruct'],
                                'children': data.root_nodes[template]['children']
                            })
                        }
                        setTemplateList(template_list)
                    }
                }
            },
            onError: (error) => {
                setMaxChildNum(error.response.data.max_child_num)
                setMaxParentNum(error.response.data.max_parent_num)
            }
        }
    );
    return {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    }
}