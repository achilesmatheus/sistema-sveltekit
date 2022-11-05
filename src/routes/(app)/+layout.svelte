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
	import Dashboard from 'carbon-icons-svelte/lib/Dashboard.svelte';
	import Document from 'carbon-icons-svelte/lib/Document.svelte';
	import ChartBar from 'carbon-icons-svelte/lib/ChartBar.svelte';
	import Person from 'carbon-icons-svelte/lib/Person.svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';

	import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import Pin from 'carbon-icons-svelte/lib/Pin.svelte';

	let isSideNavOpen = false;
	let pinnedSideNav = false;

	export let data;
</script>

<Header persistentHamburgerMenu={false} company="GCM" platformName="Sete Lagoas" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} />
		<HeaderAction icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
			<HeaderPanelLinks>
				<HeaderPanelDivider
					>{data.session.user.user_metadata.war_name} -
					{data.session.user.user_metadata.registration_number}</HeaderPanelDivider
				>
				<HeaderPanelLink href="/profile">Acessar perfil</HeaderPanelLink>
				<form action="" method="post">
					<Button icon={Logout} kind="secondary">Sair do sistema</Button>
				</form>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav class="sidenav" isOpen={isSideNavOpen} rail={pinnedSideNav || !isSideNavOpen}>
	<SideNavItems>
		{#if isSideNavOpen}
			<SideNavLink
				text="Fixar menu lateral"
				icon={Pin}
				on:click={() => (pinnedSideNav = !pinnedSideNav)}
			/>
		{/if}
		<SideNavLink
			isSelected={data?.pathname === '/dashboard'}
			href="/dashboard"
			text="Página inicial"
			icon={Dashboard}
		/>
		<SideNavLink
			isSelected={data?.pathname === '/ocorrencias'}
			href="/ocorrencias"
			text="Ocorrências"
			icon={Document}
		/>
		<SideNavLink isSelected={data.pathname === '/'} href="/" text="Estatísticas" icon={ChartBar} />
		<SideNavLink
			isSelected={data.pathname === '/perfil'}
			href="/perfil"
			text="Perfil"
			icon={Person}
		/>
	</SideNavItems>
	<Form method="post" action="/logout">
		<Button type="submit" icon={Logout}>Sair</Button>
	</Form>
</SideNav>

<Content>
	<slot />
</Content>
