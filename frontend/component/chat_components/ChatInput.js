import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const ChatInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
}));

export default ChatInput