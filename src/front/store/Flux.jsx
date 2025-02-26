

const getState = ({ getStore, getActions, setStore }) => {


	return {
		store: {
			user: null,
			token: null,
			error: null,

		},
		actions: {

			login: async (email, password) => {
				const store = getStore();
				try {
					const resp = await fetch("https://crispy-telegram-g45xj646w94pfwv6r-3001.app.github.dev/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email, password
						}),
					});
					const data = await resp.json();
					if (!resp.ok) {

						throw new Error(`Http error! status: ${resp.status}`);
					}

					setStore({ token: data.access_token, user: email })
					localStorage.setItem('token', data.access_token);

					const user = data.user;
					setStore({ user: user })

					localStorage.setItem('user', JSON.stringify(user));

					setStore({ error: null });


					return {
						login: true
					}

				} catch (error) {
					console.error("Error loading user", error);
					throw error
				}
			},


			register: async (newUser) => {
				console.log(newUser);

				try {

					const resp = await fetch("https://crispy-telegram-g45xj646w94pfwv6r-3001.app.github.dev/api/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newUser),
					});
					const data = await resp.json();

					if (!resp.ok) {
						setStore({ error: data.msg })
						throw new Error(`Http error! status: ${resp.status}`);
					}

					console.log(data);

				} catch (error) {
					console.error("Error register", error);

				}
			},
			logout: async () => {

				const store = getStore();
				try {
					setStore({ token: null, user: [] })
					localStorage.removeItem('token');
					localStorage.removeItem('user');

				} catch (error) {
					console.error("Error logout", error);
				}
			},
		}
	};
}



export default getState;