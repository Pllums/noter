import { RealtimeChannel, Session } from "@supabase/supabase-js";
import { profile } from "console";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../supa-client";

export interface UserProfile {
	username: string;
	avatarUrl?: string;
}

export interface NoterUserInfo {
	session: Session | null;
	profile: UserProfile | null;
}

export function useSession(): NoterUserInfo {
	const [userInfo, setUserInfo] = useState<NoterUserInfo>({
		session: null,
		profile: null,
	});
	const [channel, setChannel] = useState<RealtimeChannel | null>(null);

	useEffect(() => {
		supabaseClient.auth.getSession().then(({ data: { session } }) => {
			setUserInfo({ ...userInfo, session });
			supabaseClient.auth.onAuthStateChange((_event, session) => {
				setUserInfo({ session, profile: null });
			});
		});
	}, []);

	useEffect(() => {
		if (userInfo.session?.user && !userInfo.profile) {
			//have a user but no profile yet
			listenToUserProfileChanges(userInfo.session.user.id).then(
				(newChannel) => {
					if (channel) {
						channel.unsubscribe();
					}
					setChannel(newChannel);
				}
			);
		} else if (!userInfo.session?.user) {
			channel?.unsubscribe();
			setChannel(null);
		}
	}, [userInfo.session]);

	async function listenToUserProfileChanges(userId: string) {
		const { data } = await supabaseClient
			.from("user_profiles")
			.select("*")
			.filter("user_id", "eq", userId);
		if (data?.[0]) {
			setUserInfo({ ...userInfo, profile: data?.[0] });
		}
		return supabaseClient
			.channel(`public:user_profiles`)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "user_profiles",
					filter: `user_id=eq${userId}`,
				},
				(payload) => {
					setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
				}
			)
			.subscribe();
	}
	return userInfo;
}
