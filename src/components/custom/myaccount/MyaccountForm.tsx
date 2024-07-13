import Link from "next/link";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";

export const MyaccountForm = () => {
  return (
    <form>
      <div className="grid grid-cols-3 gap-5 mt-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <CustomInput label="Nome Completo" name="fullName" placeholder="Nome" />
        <CustomInput label="E-mail" name="email" placeholder="e-mail" />
        <CustomInput
          label="Plano"
          name="plan"
          placeholder="plano"
          disabled
          value="Free"
        />
        <CustomInput
          label="Nova Senha"
          name="password"
          placeholder="Insira nova senha"
          type="password"
        />
        <CustomInput
          label="Confirmar Nova Senha"
          name="confirmPassword"
          placeholder="Confirmação nova senha"
          type="password"
        />
      </div>

      <div className="flex gap-3 mt-8">
        <Link
          href="/plans"
          className="primary-color-x text-amber-50 hover:brightness-105 transition hover:shadow-lg hover:shadow-amber-500/30 px-4 py-2 rounded-md font-bold text-sm leading-6"
        >
          Upgrade Plano
        </Link>
        <CustomButton variant="success">Salvar</CustomButton>
      </div>
    </form>
  );
};
