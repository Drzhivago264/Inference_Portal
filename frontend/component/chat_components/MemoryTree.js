import React, {useState} from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import RefreshIcon from "@mui/icons-material/Refresh";
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import {TreeItem} from "@mui/x-tree-view/TreeItem";
import Typography from "@mui/material/Typography";
import {useGetMemoryTree} from "../../api_hook/useGetMemoryTree";

export const MemoryTree = () => {
	const [page_num, setPageNum] = useState(1);
	const {root_node, default_expand_node, total_node, refetch} = useGetMemoryTree(page_num);
	const getnextnode = (_, value) => {
		setPageNum(value);
	};
	const RecursiveMemoryTree = ({data}) => {
		return (
			<SimpleTreeView
				defaultExpandedItems={default_expand_node}
				aria-label='file system navigator'
				sx={{
					maxHeight: 485,
					flexGrow: 1,
					overflowY: "auto",
				}}>
				{data.map((parent) => {
					return (
						<TreeItem key={parent.id.toString()} itemId={parent.id.toString()} label={new Date(parent.created_at).toString()}>
							<Paper>
								<Typography sx={{wordBreak: "break-word"}} pl={1} pr={1} pt={1} variant='body2'>
									{" "}
									{"Prompt: " + parent.prompt}{" "}
								</Typography>
								<Typography sx={{wordBreak: "break-word"}} pl={1} pr={1} pb={1} variant='body2'>
									{"Response: " + parent.response}{" "}
								</Typography>
							</Paper>
							{parent.children && <RecursiveMemoryTree data={parent.children} />}
						</TreeItem>
					);
				})}
			</SimpleTreeView>
		);
	};
	RecursiveMemoryTree.propTypes = {
		data: PropTypes.array.isRequired,
	};
	return (
		<Paper variant='outlined'>
			<Box m={1}>
				<Typography sx={{color: "text.secondary"}}>
					Memory Tree
					<IconButton aria-label='fingerprint' color='info' size='small' onClick={refetch}>
						<RefreshIcon fontSize='small' />
					</IconButton>
				</Typography>
			</Box>
			<Divider />
			<Alert severity='info'>
				The memory tree includes all siblings for a given prompt.
				<br></br>
				You can travel left or right to periodically move to the next prompt.
				<br></br>
				Click on refresh button to fletch the latest prompt.<br></br>
			</Alert>
			{root_node && default_expand_node && <RecursiveMemoryTree data={root_node} />}
			{!root_node && <Typography variant='body2'>There is no memory yet.</Typography>}
			{total_node && root_node && (
				<Box display='flex' justifyContent='center' alignItems='center' m={1}>
					<Pagination count={total_node} showFirstButton showLastButton onChange={getnextnode} variant='outlined' shape='rounded' />
				</Box>
			)}
		</Paper>
	);
};
