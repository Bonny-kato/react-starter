import { Fragment } from "react";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { login, LoginFormType } from "~/api/auth/login.ts";
import useSubmitData from "~/hooks/useSubmitData.ts";
import useTypeActionData from "~/hooks/useTypeActionData.ts";
import useManageLoginForm from "~/pages/login/manage-login-form.ts";
import { lsKeys, lStorage } from "~/utils/local-storage.ts";
import { parseFormData } from "~/utils/parse-form-data.ts";
import renderFormField from "~/utils/render-form-field.tsx";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await parseFormData<LoginFormType>(request);
    const { error, data } = await login(formData);
    if (error)
        return {
            formData,
            formError: error.message,
        };
    lStorage.setValue(lsKeys.AUTH_USER, data);
    return redirect("/dashboard");
};

const LoginPage = () => {
    const actionData = useTypeActionData<{ data: LoginFormType }>();
    const { handleSubmit, fields } = useManageLoginForm(actionData?.data);

    const submit = useSubmitData();
    const onSubmit = (formValues: LoginFormType) => {
        submit(formValues);
    };

    return (
        <div className={"center"}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field) => (
                    <Fragment key={field.name}>
                        {renderFormField(field)}
                    </Fragment>
                ))}
                <button>login</button>
            </form>
        </div>
    );
};
export default LoginPage;
