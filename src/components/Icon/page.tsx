import classnames from "classnames";
import { useEffect, useState } from "react";

interface IconProps {
  icon: string;
  size?: number;
  className?: string;
}

const defaultSize = 24;

export default function Icon({ icon, size, className, ...props }: IconProps) {
  const [loading, setLoading] = useState(false);
  const [ImportedIcon, setImportedIcon] =
    useState<React.FC<React.SVGProps<SVGElement>>>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const importSvgIcon = async (): Promise<void> => {
      try {
        setLoading(true);
        const newIcon = (await import(`@/assets/icons/${icon}.svg?react`))
          .default;
        setImportedIcon(() => newIcon);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [icon]);

  if (loading || error || !ImportedIcon) {
    return (
      <div
        style={{
          width: size ?? defaultSize,
          height: size ?? defaultSize,
        }}
      />
    );
  }

  return (
    <ImportedIcon
      className={classnames("inline-block flex-shrink-0", className)}
      {...props}
    />
  );
}
