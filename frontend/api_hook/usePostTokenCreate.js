import {basePost} from "./basePost";
import {useMutation} from "react-query";
export const usePostTokenCreate = ({
	setTokenNameError,
	setTokenCreateLoading,
	setShowKeyCreateResponse,
	setRandomAnimation,
	setLocalTokenCreateError,
	tokenname,
	permission,
	ratelimit,
	ratelimit_time_unit,
	ttl,
	time_unit,
	use_ttl,
}) => {
	const {mutate: tokencreatemutate, error: servertokencreateerror, data: servertokencreatedata} = useMutation(basePost);
	const postCreateToken = (event) => {
		event.preventDefault();
		setTokenNameError(false);
		setRandomAnimation(false);
		setLocalTokenCreateError(null);
		setTokenCreateLoading(true);
		setShowKeyCreateResponse(false);

		const perm_count = Object.values(permission).filter((val) => val).length;

		if (!tokenname) {
			setTokenCreateLoading(false);
			setTokenNameError(true);
		} else if (perm_count === 0) {
			setLocalTokenCreateError(
				"You tried to create a token without any permission, the key will be unusable. Associate at least one permission for the token."
			);
		} else if (tokenname.length > 50) {
			setLocalTokenCreateError("You tried to create a token name longer than 50 chars.");
		} else if (ttl <= 0 || ttl > 999999) {
			setLocalTokenCreateError("You tried to create a token with invalid time to live (0 < ttl < 999999).");
		} else if (ratelimit <= 0 || ratelimit > 999999) {
			setLocalTokenCreateError("You tried to create a token with invalid rate limit (0 < rate limit < 999999).");
		} else if (!["day", "hour", "minute", "second"].includes(time_unit) || !["day", "hour", "minute", "second"].includes(ratelimit_time_unit)) {
			setLocalTokenCreateError("You tried to create a token with invalid time unit ['day', 'hour', 'minute', 'second'].");
		} else {
			const data = {
				token_name: tokenname,
				permission,
				ttl,
				time_unit,
				use_ttl,
				ratelimit,
				ratelimit_time_unit,
			};

			tokencreatemutate(
				{url: "/frontend-api/generate-token", data},
				{
					onSuccess: () => {
						setShowKeyCreateResponse(true);
					},
				}
			);
		}

		setTokenCreateLoading(false);
	};
	return {
		fetch: postCreateToken,
		error: servertokencreateerror,
		data: servertokencreatedata,
	};
};
