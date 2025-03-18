.PHONY := lint check fix docker_lint jinja_lint python_lint_check shell_lint yaml_lint jinja_format_check python_format_check shell_format_check yaml_format_check jinja_format_fix python_lint_fix python_format_fix shell_format_fix yaml_format_fix help

all: lint check

lint: docker_lint jinja_lint python_lint_check shell_lint yaml_lint

check: jinja_format_check python_format_check shell_format_check yaml_format_check

fix: jinja_format_fix python_lint_fix python_format_fix shell_format_fix yaml_format_fix

define HELP_MESSAGE

make all: lint check
make lint: docker_lint jinja_lint python_lint_check shell_lint yaml_lint
make check: jinja_format_check python_format_check shell_format_check yaml_format_check
make fix: jinja_format_fix python_lint_fix python_format_fix shell_format_fix yaml_format_fix

Dockerfile: 		`hadolint`		https://github.com/hadolint/hadolint/wiki
Jinja:			`djlint`		https://www.djlint.com/docs/configuration/
Python:			`ruff`			https://docs.astral.sh/ruff/
Bash Linting:		`shellcheck`		https://www.shellcheck.net/wiki/Home
Bash Formatting:	`shfmt`			https://github.com/patrickvane/shfmt
YAML Linting:		`yamllint`		https://yamllint.readthedocs.io/en/stable/configuration.html
YAML Formatting:	`yamlfmt`		https://github.com/google/yamlfmt/tree/main/docs

endef

export HELP_MESSAGE

help: 
	@echo "$$HELP_MESSAGE"

docker_lint:
	-for dockerfile in $$(bash -c 'find /code -name "Dockerfile"'); do \
		echo "Checking $$dockerfile:"; \
		hadolint $$dockerfile; \
	done

jinja_lint:
	-for jinjafile in $$(bash -c 'find /code -name "*.j2"'); do \
		djlint $$jinjafile --lint; \
    done

jinja_format_check:
	-djlint /code --check --extension=j2
	-djlint /code --check --extension=html

jinja_format_fix:
	djlint /code --reformat --extension=j2
	djlint /code --reformat --extension=html

python_lint_check:
	-ruff check /code --output-format=github

python_lint_fix:
	ruff check /code --fix --output-format=github

python_format_check:
	-ruff format /code --diff

python_format_fix:
	ruff format /code

shell_lint:
	-for shellfile in $$(bash -c 'find /code -name "*.sh"'); do \
		shellcheck $$shellfile ; \
	done

shell_format_check:
	-shfmt -d /code

shell_format_fix:
	shfmt -w /code

yaml_lint:
	-for yamlfile in $$(find . -name '*.yaml'); do \
		yamllint $$yamlfile ; \
	done

yaml_format_check:
	-yamlfmt -dry -formatter trim_trailing_whitespace=true,include_document_start=true /code

yaml_format_fix:
	yamlfmt -formatter trim_trailing_whitespace=true,include_document_start=true /code
