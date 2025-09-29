import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogleDefault, signInWithGoogleEmail, createAccountWithGoogle, signIn } from "@/lib/auth";
import { Mail, UserPlus } from "lucide-react";

interface GoogleAuthModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSignedIn?: () => void;
}

const GoogleAuthModal = ({ open, onOpenChange, onSignedIn }: GoogleAuthModalProps) => {
  const [step, setStep] = useState<'signin' | 'create'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep('signin');
      setEmail('');
      setName('');
      setError(null);
    }
  }, [open]);

  const disabled = useMemo(() => step === 'signin' ? email.trim() === '' : (email.trim() === '' || name.trim() === ''), [step, email, name]);

  const handleContinueDefault = () => {
    signInWithGoogleDefault();
    onOpenChange(false);
    onSignedIn?.();
  };

  const handleNext = () => {
    setError(null);
    const res = signInWithGoogleEmail(email.trim());
    if (res.ok) {
      onOpenChange(false);
      onSignedIn?.();
    } else {
      setStep('create');
    }
  };

  const handleCreate = () => {
    setError(null);
    if (!name.trim()) return setError('Name is required');
    const result = createAccountWithGoogle(name.trim(), email.trim());
    if ((result as any).ok) {
      onOpenChange(false);
      onSignedIn?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{step === 'signin' ? 'Sign in with Google' : 'Create your account'}</DialogTitle>
        </DialogHeader>

        {step === 'signin' ? (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="text-xs text-muted-foreground">Use your college Gmail to sign in. If it doesn't exist, you'll be able to create an account.</div>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <div className="flex flex-col gap-2">
              <Button onClick={handleNext} disabled={disabled}><Mail className="w-4 h-4 mr-2"/>Next</Button>
              <Button variant="secondary" onClick={handleContinueDefault}>Continue with Google (Test)</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="create-email">Email</Label>
              <Input id="create-email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Your name" value={name} onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className="text-xs text-muted-foreground">Your account will be created and signed in. Roles can be assigned later by admins.</div>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <div className="flex flex-col gap-2">
              <Button onClick={handleCreate} disabled={disabled}><UserPlus className="w-4 h-4 mr-2"/>Create account</Button>
              <Button variant="outline" onClick={()=> setStep('signin')}>Back</Button>
            </div>
          </div>
        )}

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default GoogleAuthModal;
