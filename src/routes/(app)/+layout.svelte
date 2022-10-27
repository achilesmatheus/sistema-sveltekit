<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SkipToContent,
		Content,
		Button,
		Form,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelDivider,
		HeaderPanelLink,
		HeaderGlobalAction,
		HeaderUtilities
	} from 'carbon-components-svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';

	import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';

	let isSideNavOpen = false;

	export let data;
</script>

<Header persistentHamburgerMenu={true} company="GCM" platformName="Sete Lagoas" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderNavItem href="/" text="Link 1" />
		<HeaderNavItem href="/" text="Link 2" />
		<HeaderNavItem href="/" text="Link 3" />
		<HeaderNavMenu text="Menu">
			<HeaderNavItem href="/" text="Link 1" />
			<HeaderNavItem href="/" text="Link 2" />
			<HeaderNavItem href="/" text="Link 3" />
		</HeaderNavMenu>
	</HeaderNav>
	<HeaderUtilities>
		<HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} />
		<HeaderAction icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 2</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 3</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 4</HeaderPanelLink>
				<HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 2</HeaderPanelLink>
				<HeaderPanelDivider>Switcher subject 3</HeaderPanelDivider>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
		<HeaderAction>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
				<HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 2</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 3</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 4</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 5</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav class="sidenav" isOpen={true} fixed>
	<SideNavItems>
		<SideNavLink
			isSelected={data?.pathname === '/dashboard'}
			href="/dashboard"
			text="Página inicial"
		/>
		<SideNavMenu href="/" text="Ocorrências">
			<SideNavMenuItem href="/" text="Link 1" />
			<SideNavMenuItem href="/" text="Link 2" />
			<SideNavMenuItem href="/" text="Link 3" />
		</SideNavMenu>
		<SideNavLink isSelected={data.pathname === '/'} href="/" text="Estatísticas" />
		<SideNavLink isSelected={data.pathname === '/'} href="/signup" text="Perfil" />
	</SideNavItems>
	<Form method="post" action="/logout">
		<Button class="btn_logout" type="submit" kind="secondary" icon={Logout}>Sair</Button>
	</Form>
</SideNav>

<Content>
	<slot />
</Content>
