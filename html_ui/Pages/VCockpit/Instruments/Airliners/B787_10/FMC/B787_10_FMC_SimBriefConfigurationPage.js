Include.addScript('/Heavy/Utils/HeavyDataStorage.js');

class B787_10_FMC_SimBriefConfigurationPage {

	constructor(fmc) {
		this.fmc = fmc;
	}

	showPage() {
		this.fmc.clearDisplay();

		let simBriefUsernameCell = this.getSimBriefUsernameCell();
		let simBriefUserIdCell = this.getSimBriefUserIdCell();
		let routeOnlyCell = (HeavyDivision.simbrief.importRouteOnly() ? '<[color=green]YES[/color]←→[size=small]NO[/size]' : '<[size=small]YES[/size]←→[color=green]NO[/color]');

		this.fmc.setTemplate([
			['SIMBRIEF CONFIGURATION'],
			['Route Only', 'Username'],
			[routeOnlyCell, simBriefUsernameCell],
			['', 'UserID'],
			['', simBriefUserIdCell],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			['<BACK']
		]);

		this.setupInputHandlers();

		this.fmc.updateSideButtonActiveStatus();
	}

	setupInputHandlers() {
		this.fmc.onLeftInput[5] = () => {
			B787_10_FMC_HeavyConfigurationPage.ShowPage1(this.fmc);
		};

		this.fmc.onRightInput[0] = () => {
			let value = this.fmc.inOut;
			if (value === FMCMainDisplay.clrValue) {
				this.fmc.inOut = '';
				HeavyDataStorage.set('SIMBRIEF_USERNAME', '');
			} else if (value.length > 0) {
				this.fmc.clearUserInput();
				HeavyDataStorage.set('SIMBRIEF_USERNAME', value);
			}
			this.showPage();
		};

		this.fmc.onRightInput[1] = () => {
			let value = this.fmc.inOut;
			if (value === FMCMainDisplay.clrValue) {
				this.fmc.inOut = '';
				HeavyDataStorage.set('SIMBRIEF_USERID', '');
			} else if (value.length > 0) {
				this.fmc.clearUserInput();
				HeavyDataStorage.set('SIMBRIEF_USERID', value);
			}

			this.showPage();
		};

		this.fmc.onLeftInput[0] = () => {
			if (HeavyDivision.simbrief.importRouteOnly()) {
				HeavyDataStorage.set('SIMBRIEF_ROUTE_ONLY', '0');
			} else {
				HeavyDataStorage.set('SIMBRIEF_ROUTE_ONLY', '1');
			}
			this.showPage();
		};
	}

	getSimBriefUsernameCell() {
		let cell = '-----';
		let username = HeavyDataStorage.get('SIMBRIEF_USERNAME', '');
		if (username) {
			cell = '[color=green]' + username + '[/color]';
		}
		return cell;
	}

	getSimBriefUserIdCell() {
		let cell = '-----';
		let userid = HeavyDataStorage.get('SIMBRIEF_USERID', '');
		if (userid) {
			cell = '[color=green]' + userid + '[/color]';
		}
		return cell;
	}

}