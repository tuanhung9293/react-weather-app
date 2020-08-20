import React from 'react';
import theme from './theme'
import { ThemeProvider } from 'emotion-theming'
import { Box } from 'rebass';
import { Weather } from 'components/weather/weather';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box
				backgroundColor='bg_main'
				sx={{ minHeight: '100vh' }}
			>
				<Weather />
			</Box>
		</ThemeProvider >
	);
}

export default App;
