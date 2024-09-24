import { Fragment } from "react";
import { LoginFormType } from "~/api/login/login-form-schema.ts";
import Button from "~/components/FormControl/Button.tsx";
import { useLogin } from "~/pages/Login/loginQueries.ts";
import { useManageLoginForm } from "~/pages/Login/manage-login-form.ts";
import renderFormField from "~/utils/renderFormField.tsx";

const Login = () => {
    const { fields, handleSubmit } = useManageLoginForm();

    const { mutate: loginMutation, isLoading } = useLogin();

    const onSubmit = (formData: LoginFormType) => {
        console.log("[form-value]", formData);

        loginMutation(formData);
    };

    return (
        <section className={"center h-screen"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>

                <div>
                    {fields.map((field) => (
                        <Fragment key={field.name}>
                            {renderFormField(field)}
                        </Fragment>
                    ))}
                </div>

                <Button loading={isLoading}>Login</Button>
            </form>
        </section>
    );
};
export default Login;
