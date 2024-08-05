'use client';

import Nav from './Nav/Nav'
import PageLayout from './PageLayout'
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";

interface AppLayoutProps {
	children: React.ReactNode
}

import {theme} from "@/theme";

const customTheme = createTheme(theme);

const AppLayout = ({ children }: AppLayoutProps) => (
	<ThemeProvider theme={customTheme}>
	<div className="flex min-h-screen flex-col">
		<Nav />
		<main className="flex-1">
			<PageLayout>{children}</PageLayout>
		</main>
	</div>
	</ThemeProvider>
)

export default AppLayout
