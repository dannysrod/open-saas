import { serialize as superjsonSerialize } from 'superjson';
import { handleRejection } from '../../utils.js';
import { throwInvalidCredentialsError } from '../../core/auth.js';
export default handleRejection(async (req, res) => {
    if (req.user) {
        return res.json(superjsonSerialize(req.user));
    }
    else {
        throwInvalidCredentialsError();
    }
});
//# sourceMappingURL=me.js.map